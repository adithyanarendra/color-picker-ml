const chroma = require('chroma-js');
const ColorPreference = require('../models/ColorPreference');

const getSimilarColor = (hex) => {
    const color = chroma(hex);
    const hsl = color.hsl();
    return chroma.hsl(
        hsl[0],
        Math.min(1, hsl[1] + 0.1),
        Math.min(1, hsl[2] + 0.1)
    ).hex();
};

const getNonComplementaryColor = (hex) => {
    const base = chroma(hex);
    let newColor;
    do {
        newColor = chroma.random();
    } while (chroma.deltaE(base, newColor) < 25);
    return newColor.hex();
};

const updateColor = async (req, res) => {
    const { index, action, hex } = req.body;
    let updatedColor = hex;

    if (action === 'meh') {
        updatedColor = getSimilarColor(hex);
    } else if (action === 'dislike') {
        updatedColor = getNonComplementaryColor(hex);
    }

    // Save to MongoDB
    try {
        await ColorPreference.create({ hex, action });
    } catch (err) {
        console.error('Error saving to MongoDB:', err);
    }

    res.json({ index, newHex: updatedColor });
};

module.exports = { updateColor };
