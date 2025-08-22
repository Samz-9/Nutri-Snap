'use client';

import React from 'react'; 

export default function ResultCard({ result, isVisible }) {
  if (!isVisible) return null;

  const getNutritionLevel = (level) => {
    switch (level.toLowerCase()) {
      case 'high':
        return { color: '#f44336', icon: '🔴' };
      case 'medium':
        return { color: '#ff9800', icon: '🟡' };
      case 'low':
        return { color: '#4caf50', icon: '🟢' };
      default:
        return { color: '#666', icon: '⚪' };
    }
  };

  const carbsStyle = getNutritionLevel(result.nutrition.carbs);
  const proteinStyle = getNutritionLevel(result.nutrition.protein);
  const fatStyle = getNutritionLevel(result.nutrition.fat);

  return (
    <div className="result-card">
      <h3 className="result-title">🍽️ Food Analysis</h3>

      <div className="food-info">
        <h4 className="food-name">{result.food}</h4>

        <div className="nutrition-grid">
          <div className="nutrition-item carbs">
            <div className="nutrition-icon">🍞</div>
            <div className="nutrition-label">Carbs</div>
            <div className="nutrition-value" style={{ color: carbsStyle.color }}>
              {carbsStyle.icon} {result.nutrition.carbs}
            </div>
          </div>

          <div className="nutrition-item protein">
            <div className="nutrition-icon">🥩</div>
            <div className="nutrition-label">Protein</div>
            <div
              className="nutrition-value"
              style={{ color: proteinStyle.color }}
            >
              {proteinStyle.icon} {result.nutrition.protein}
            </div>
          </div>

          <div className="nutrition-item fat">
            <div className="nutrition-icon">🥑</div>
            <div className="nutrition-label">Fat</div>
            <div className="nutrition-value" style={{ color: fatStyle.color }}>
              {fatStyle.icon} {result.nutrition.fat}
            </div>
          </div>
        </div>
      </div>

      <div className="result-footer">
        <p className="analysis-complete">Analysis complete! 🎉</p>
      </div>
    </div>
  );
}
