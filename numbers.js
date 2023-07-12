function solve(numbers, target) {
  let closestValue = Infinity;
  let closestExpression = null;
  let targetReached = false;
  
  function dfs(index, expression, value, used) {
      if (index === numbers.length) {
          if (value === target) {
              targetReached = true;
              closestValue = value;
              closestExpression = expression;
              return;
          }
          if (Math.abs(target - value) < Math.abs(target - closestValue)) {
              closestValue = value;
              closestExpression = expression;
          }
          return;
      }
      
      if (targetReached) return;
      
      for (let i = 0; i < numbers.length; i++) {
          if (used & (1 << i)) continue; // if number is already used, skip it
          
          // Try adding the number
          dfs(index + 1, expression + ' + ' + numbers[i], value + numbers[i], used | (1 << i));
          // Try subtracting the number
          dfs(index + 1, expression + ' - ' + numbers[i], value - numbers[i], used | (1 << i));
          // Try multiplying by the number
          dfs(index + 1, expression + ' * ' + numbers[i], value * numbers[i], used | (1 << i));
          // Try dividing by the number, if not zero
          if (numbers[i] !== 0) {
              dfs(index + 1, expression + ' / ' + numbers[i], value / numbers[i], used | (1 << i));
          }
      }
  }
  
  for (let i = 0; i < numbers.length; i++) {
      dfs(1, numbers[i].toString(), numbers[i], 1 << i);
      if (targetReached) break;
  }
  
  if (targetReached) {
      console.log("Target reached: ", closestExpression, "=", target);
  } else {
      console.log("Closest match: ", closestExpression, "=", closestValue);
  }
}

// enter random numbers and set target
const numbers = [75, 4, 2, 10, 9, 5];
const target = 3;

solve(numbers, target);
