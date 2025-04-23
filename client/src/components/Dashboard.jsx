import React, { useState } from 'react';

const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
};

const initialColors = Array.from({ length: 5 }, () => ({
    hex: generateRandomColor(),
    status: 'none',
}));



const Dashboard = () => {
    const [colors, setColors] = useState(initialColors);

    const handleAction = async (index, action, hex) => {
        try {
            const response = await fetch('http://localhost:5000/api/colors/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ index, action, hex })
            });

            const data = await response.json();
            setColors((prevColors) =>
                prevColors.map((color, i) =>
                    i === index
                        ? { ...color, hex: data.newHex }
                        : (action === 'like'
                            ? color
                            : prevColors[i])
                )
            );
        } catch (err) {
            console.error('Error updating color:', err);
        }
    };


    return (
        <div style={styles.container}>
            {colors.map((color, index) => (
                <div key={index} style={{ ...styles.colorCard, backgroundColor: color.hex }}>
                    <div style={styles.hexLabel}>{color.hex}</div>
                    <div style={styles.buttons}>
                        <button onClick={() => handleAction(index, 'like', color?.hex)}>👍 Like</button>
                        <button onClick={() => handleAction(index, 'meh', color?.hex)}>😐 Meh</button>
                        <button onClick={() => handleAction(index, 'dislike', color?.hex)}>👎 Dislike</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        gap: '1rem',
        padding: '2rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    colorCard: {
        width: '150px',
        height: '150px',
        borderRadius: '10px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1rem',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    },
    hexLabel: {
        fontWeight: 'bold',
        textShadow: '1px 1px 2px black',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.3rem',
    },
};

export default Dashboard;
