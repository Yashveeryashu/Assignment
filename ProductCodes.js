function processData(data) {
    // This will store our final result
    const result = {
        totalCodes: data.length,
        validCodes: 0,
        invalidCodes: 0,
        normalizedValidCodes: []
    };

    // Check each product code one by one
    for (let i = 0; i < data.length; i++) {
        const code = data[i];
        let isValid = true;

        // First check: code must be exactly 7 characters long
        if (code.length !== 7) {
            isValid = false;
        } else {
            // Check first 3 characters are letters
            for (let j = 0; j < 3; j++) {
                const char = code[j];
                if (!((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z'))) {
                    isValid = false;
                    break;
                }
            }

            // Check last 4 characters are numbers
            if (isValid) {
                for (let j = 3; j < 7; j++) {
                    const char = code[j];
                    if (!(char >= '0' && char <= '9')) {
                        isValid = false;
                        break;
                    }
                }
            }
        }

        // Update counts based on validation
        if (isValid) {
            result.validCodes++;
            // Convert to uppercase and add to valid codes list
            result.normalizedValidCodes.push(code.slice(0, 3).toUpperCase() + code.slice(3));
        } else {
            result.invalidCodes++;
        }
    }

    // Sort the valid codes alphabetically
    result.normalizedValidCodes.sort();

    return result;
}

// Test code (add this at the bottom)
const testData = ["abc1234", "XYZ0001", "123ABCD", "A1B2C3D", "lmn9876", "DEF5678"];
console.log(processData(testData));



module.exports = { processData };


// run the file and you will get this output 
// {
//   totalCodes: 6,
//   validCodes: 4,
//   invalidCodes: 2,
//   normalizedValidCodes: [ 'ABC1234', 'DEF5678', 'LMN9876', 'XYZ0001' ]
// }
