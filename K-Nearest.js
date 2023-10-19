class KNN {
  constructor(k) {
    this.k = k;
    this.data = [];
  }

  fit(trainingData) {
    this.data = trainingData;
  }

  euclideanDistance(point1, point2) {
    let sum = 0;
    for (let i = 0; i < point1.length; i++) {
      sum += Math.pow(point1[i] - point2[i], 2);
    }
    return Math.sqrt(sum);
  }

  predict(input) {
    const distances = [];

    for (const item of this.data) {
      const distance = this.euclideanDistance(input, item.features);
      distances.push({ distance, label: item.label });
    }

    distances.sort((a, b) => a.distance - b.distance);

    const kNearestNeighbors = distances.slice(0, this.k);

    const counts = {};
    for (const neighbor of kNearestNeighbors) {
      if (counts[neighbor.label]) {
        counts[neighbor.label]++;
      } else {
        counts[neighbor.label] = 1;
      }
    }

    let maxCount = 0;
    let predictedLabel;

    for (const label in counts) {
      if (counts[label] > maxCount) {
        maxCount = counts[label];
        predictedLabel = label;
      }
    }

    return predictedLabel;
  }
}

// Example usage
const knn = new KNN(3);
const trainingData = [
  { features: [1, 2], label: 'A' },
  { features: [2, 3], label: 'A' },
  { features: [3, 4], label: 'B' },
  { features: [4, 5], label: 'B' },
];

knn.fit(trainingData);

const input = [2.5, 3.5];
const prediction = knn.predict(input);
console.log(`Prediction: ${prediction}`);
