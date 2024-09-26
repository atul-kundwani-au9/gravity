function lengthOfLongest(nums) {
    if (!Array.isArray(nums)) {
        throw new TypeError('Input must be an array.');
    }
    if (nums.length === 0) return 0;

    const n = nums.length;
    const dp = new Array(n).fill(1); 

    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {           
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    
    return Math.max(...dp);
}


const nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLongest(nums)); 
