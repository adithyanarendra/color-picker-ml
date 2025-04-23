const chroma = require('chroma-js');
const ColorPreference = require('../models/ColorPreference');

const getSimilarColor = (hex) => {
    const color = chroma(hex);
    const [h, s, l] = color.hsl();

    const hueShift = (Math.random() < 0.5 ? -1 : 1) * (10 + Math.random() * 10);
    const newHue = (h + hueShift + 360) % 360;

    const lightnessShift = (Math.random() < 0.5 ? -1 : 1) * (0.05 + Math.random() * 0.05);
    const newLightness = Math.min(1, Math.max(0, l + lightnessShift));

    const newSaturation = Math.min(1, Math.max(0, s + (Math.random() - 0.5) * 0.1));

    return chroma.hsl(newHue, newSaturation, newLightness).hex();
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
