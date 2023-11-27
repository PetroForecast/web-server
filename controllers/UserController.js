// This is where our business and validation logic lives (Checking input to running calculations)
const UserModel = require('../models/UserModel');
////////////////////////////////////////////////////////////////////////
async function getAllUsers(req, res) {
    try {
        const users = await UserModel.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        return res.status(500).json({ error: 'Error getting users' });
    }
}
////////////////////////////////////////////////////////////////////////
async function getByUsername(req, res) {
    try {
        //TODO: clean the request before sending into model
        const username = req.params.username;
        const user = await UserModel.getByUsername(username);
        return res.status(200).json(user);
    } catch (error) {
        console.error('User not found', error);
        return res.status(404).json({ error: 'User not found' });
    }
}
////////////////////////////////////////////////////////////////////////
async function getQuoteHistoryByUsername(req, res) {
    try {
        const username = req.params.username;
        const quoteHistory = await UserModel.getQuoteHistoryByUsername(username);
        return res.status(200).json(quoteHistory);
    } catch (error) {
        console.error('User Quote History not found', error);
        return res.status(404).json({ error: 'User Quote History not found' });
    }
}
////////////////////////////////////////////////////////////////////////
async function isUsernameAvailable(req, res) {
    try {
        const usernameToCheck = req.params.username;
        const isAvailable = await UserModel.isUsernameAvailable(usernameToCheck);
        if (isAvailable) {
            return res.status(200).json({ available: true });
        } else {
            return res.status(409).json({ available: false });
        }

    } catch (error) {
        console.error('Error checking username availability:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}
////////////////////////////////////////////////////////////////////////
async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await UserModel.loginUser(String(username), String(password));
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        return res.json(user);
    } catch (error) {
        console.error('Error logging in', error);
        return res.status(500).json({ error: 'Error logging in' });
    }
}
////////////////////////////////////////////////////////////////////////
async function registerUser(req, res) {
    try {
        const { username, password } = req.body;
        if (Object.keys(req.body).length === 0 || Object.values(req.body).some(value => value === '')) {
            return res.status(422).json({ error: 'Empty Request Body or Empty String Values' });
        }
        const user = await UserModel.registerUser(String(username), String(password));
        if (!user) {
            return res.status(401).json({ error: 'Error Retrieving User' });
        }
        return res.status(201).json(user);
    } catch (error) {
        console.error('Error Registering User:', error);
        return res.status(500).json({ error: 'Error Registering User' });
    }
}
////////////////////////////////////////////////////////////////////////
async function updateUser(req, res) {
    try {
        const username = req.params.username;
        const updatedUserInfo = req.body;
        const updatedUser = await UserModel.updateUser(username, updatedUserInfo);
        return res.status(201).json(updatedUser);
    } catch (error) {
        console.error('Error Updating User:', error);
        return res.status(500).json({ error: 'Error Updating User' });
    }
}
////////////////////////////////////////////////////////////////////////
async function addQuote(req, res) {
    try {
        const newQuote = req.body;
        const result = await UserModel.addQuote(newQuote);
        return res.status(201).json(result);
    } catch (error) {
        console.error('Error Adding Quote:', error);
        return res.status(500).json({ error: 'Error Adding Quote' });
    }
}
////////////////////////////////////////////////////////////////////////
//Handles the business logic calculations and does not have a Model associated with it.
async function checkQuote(req, res) {
    try {
        const params = { ...req.body };
        const { gallonsRequested, deliveryAddress, deliveryDate, user } = params;
        const userInfo = await UserModel.getByUsername(user);
        const userQuoteHistory = await UserModel.getQuoteHistoryByUsername(user);

        let hasHistory;
        let state;

        if (!userQuoteHistory.length) {
            console.log('here');
            throw new Error(`User does not exist for: ${user}`);
        } else if (userQuoteHistory.length < 1) {
            hasHistory = false;
        } else {
            hasHistory = true;
        }

        if (userInfo.state) {
            //console.log(userInfo.state);
            state = userInfo.state;
        } else {
            console.log('no state found');
            throw new Error(`State not found for: ${user}`);
        }

        //NOTES:
        // Suggested Price = (Current Price) + (Margin)
        // (Current price) = 1.50 * Number of gallons requested
        // (Margin) = (Current Price) * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor)
        // *Factors*
        // Location Factor = 2% for Texas, 4% out of state
        //      state = query the user's client info and obtain state
        //      const locationFactor = (state === 'TX') ? 0.02 : 0.04;
        // Rate History Factor = 1% if client requested fuel before, 0% if no history
        //      numQuotes = query to fuel quote history table
        //      const rateHistoryFactor = (numQuotes > 0) ? 0.01 : 0;
        // Gallons Requested Factor = 2% if > 1000, 3% if less
        //      const gallonsRequestedFactor = (gallonsRequested > 1000) ? 0.02 : 0.03;
        // Company Profit Factor = 10% always
        //      const companyProfitFactor = 0.1;

        // Factors
        const locationFactor = (state === 'TX') ? 0.02 : 0.04;
        const rateHistoryFactor = (hasHistory) ? 0.01 : 0;
        const gallonsRequestedFactor = (gallonsRequested > 1000) ? 0.02 : 0.03;
        const companyProfitFactor = 0.1;

        // Calculations
        const pricePerGallon = 1.50;
        const margin = pricePerGallon * (locationFactor - rateHistoryFactor + gallonsRequestedFactor + companyProfitFactor);
        const suggestedPricePerGallon = pricePerGallon + margin;
        const suggestedTotalPrice = gallonsRequested * suggestedPricePerGallon;

        const pricingInfo = {
            suggestedPricePerGallon,
            suggestedTotalPrice
        };

        return res.status(200).json(pricingInfo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
////////////////////////////////////////////////////////////////////////
module.exports = {
    getAllUsers,
    getByUsername,
    getQuoteHistoryByUsername,
    isUsernameAvailable,
    loginUser,
    registerUser,
    updateUser,
    addQuote,
    checkQuote
};