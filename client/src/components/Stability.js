import React from 'react';

const Stability = ({marks}) => {
    const calculateMSD = () => {
        const mean = marks.reduce((sum, cur) => sum+cur, 0)/marks.length
        return Math.sqrt(marks.reduce((sum, cur) => sum+(cur-mean)**2, 0) / marks.length)
    }

    const stabilityDetermine = () => {
        const msd = calculateMSD()
        switch (true) {
            case (msd > 1.6):
                return "Очень низкий"
            case (msd > 1.2):
                return "Низкий"
            case (msd > 0.7):
                return "Средний"
            case (msd > 0.3):
                return "Высокий"
            default:
                return "Очень высокий"
        }
    }

    return (
            <h3 className="mt-3 p-2">Уровень стабильности самооценки: {stabilityDetermine()}</h3>
    );
};

export default Stability;