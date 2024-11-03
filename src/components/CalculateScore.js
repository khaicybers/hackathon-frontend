const calculateScore = (values, isNaturalScience) => {
  const {
    mathScore,
    literatureScore,
    foreignLanguageScore,
    physicsScore,
    chemistryScore,
    biologyScore,
    historyScore,
    geographyScore,
    civicEducationScore,
    encouragementScore,
    additionalScore,
    averageScore,
  } = values;

  const isValidInput = (inputValue) => {
    return !isNaN(inputValue) && inputValue !== "";
  };

  if (
    !isValidInput(mathScore) ||
    !isValidInput(literatureScore) ||
    !isValidInput(foreignLanguageScore) ||
    (isNaturalScience &&
      (!isValidInput(physicsScore) ||
        !isValidInput(chemistryScore) ||
        !isValidInput(biologyScore))) ||
    (!isNaturalScience &&
      (!isValidInput(historyScore) ||
        !isValidInput(geographyScore) ||
        !isValidInput(civicEducationScore))) ||
    !isValidInput(encouragementScore) ||
    (additionalScore && !isValidInput(additionalScore)) ||
    !isValidInput(averageScore)
  ) {
    return "Invalid input";
  }

  let totalScore =
    Number(mathScore) + Number(literatureScore) + Number(foreignLanguageScore);

  if (isNaturalScience) {
    totalScore +=
      (Number(physicsScore) + Number(chemistryScore) + Number(biologyScore)) /
      3;
  } else {
    totalScore +=
      (Number(historyScore) +
        Number(geographyScore) +
        Number(civicEducationScore)) /
      3;
  }

  totalScore += Number(encouragementScore);

  const averageGrade12 = Number(averageScore) * 3;

  let sumScore = (totalScore / 4) * 7 + averageGrade12;

  let finalScore = sumScore / 10;

  let lastScore = finalScore + Number(additionalScore);

  return (Math.round(lastScore * 10) / 10).toFixed(1);
};

export default calculateScore;
