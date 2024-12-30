import { readFile } from 'fs';

const decodeNumber = (value, base) => parseInt(value, base);

const extractDataPoints = (data) => {
    const dataPoints = [];
    for (const key in data) {
        if (key !== 'keys') {
            const base = parseInt(data[key].base, 10);
            const decodedValue = decodeNumber(data[key].value, base);
            const xValue = parseInt(key);
            dataPoints.push({ x: xValue, y: decodedValue });
        }
    }
    return dataPoints;
};

const calculateLagrangePolynomial = (xi, dataPoints) => {
    let product = 1;
    for (const point of dataPoints) {
        if (point.x !== xi) {
            product *= (0 - point.x) / (xi - point.x);
        }
    }
    return product;
};

const calculateConstantTerm = (dataPoints) => {
    let constantTerm = 0;
    for (const point of dataPoints) {
        const lagrangeFactor = calculateLagrangePolynomial(point.x, dataPoints);
        constantTerm += point.y * lagrangeFactor;
    }
    return constantTerm;
};

const processTestCase = (testCaseFile) => {
    readFile(testCaseFile, 'utf8', (error, fileData) => {
        if (error) {
            console.error(`Error reading the ${testCaseFile}:`, error);
            return;
        }

        const inputData = JSON.parse(fileData);
        const dataPoints = extractDataPoints(inputData);
        const secretConstant = calculateConstantTerm(dataPoints);
        const roundedConstant = Math.round(secretConstant);
        console.log(`${testCaseFile} - The constant term (c) is:`, roundedConstant);
    });
};

processTestCase('testCase1.json');
processTestCase('testCase2.json');