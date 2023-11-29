#Creating FuelQuote Table

CREATE TABLE FuelQuote (
    quoteId INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(50) NOT NULL,
    gallonsRequested DECIMAL(10, 2) NOT NULL,
    deliveryAddress VARCHAR(100) NOT NULL,
    deliveryDate DATE NOT NULL,
    suggestedPricePerGallon DECIMAL(10, 2) NOT NULL,
    totalAmountDue DECIMAL(10, 2),
    FOREIGN KEY (userId) REFERENCES UserCredential(userId)
);
