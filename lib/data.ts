export interface Customer {
    id: string;
    name: string;
    division: string;
    gender: string;
    maritalStatus: string;
    age: number;
    income: number;
  }
  
  export const customers: Customer[] = [
    { id: "BU79786", name: "Andrew", division: "Dhaka", gender: "F", maritalStatus: "Married", age: 36, income: 56274 },
    { id: "QZ44356", name: "Anne", division: "Rajshahi", gender: "F", maritalStatus: "Single", age: 31, income: 0 },
    { id: "AI49188", name: "Anthony", division: "Khulna", gender: "F", maritalStatus: "Married", age: 50, income: 48767 },
    { id: "WW63253", name: "Barbara", division: "Barishal", gender: "M", maritalStatus: "Married", age: 43, income: 0 },
    { id: "HB64268", name: "Brian", division: "Mymensingh", gender: "M", maritalStatus: "Single", age: 37, income: 43836 },
    { id: "OC83172", name: "Bruce", division: "Sylhet", gender: "F", maritalStatus: "Married", age: 38, income: 62902 },
    { id: "XZ87318", name: "Carol", division: "Khulna", gender: "F", maritalStatus: "Married", age: 36, income: 55350 },
    { id: "CF85061", name: "Christine", division: "Barishal", gender: "M", maritalStatus: "Single", age: 38, income: 0 },
    { id: "DY87989", name: "Christopher", division: "Mymensingh", gender: "M", maritalStatus: "Divorced", age: 30, income: 14072 },
    { id: "BQ94931", name: "Craig", division: "Sylhet", gender: "F", maritalStatus: "Married", age: 42, income: 28812 },
    { id: "SX51350", name: "David", division: "Rangpur", gender: "M", maritalStatus: "Single", age: 31, income: 0 },
    { id: "VQ65197", name: "Diane", division: "Chattogram", gender: "F", maritalStatus: "Married", age: 28, income: 0 },
    { id: "DP39365", name: "Elizabeth", division: "Dhaka", gender: "M", maritalStatus: "Married", age: 50, income: 77026 },
    { id: "SJ95423", name: "Grant", division: "Rajshahi", gender: "M", maritalStatus: "Married", age: 39, income: 99845 },
    { id: "IL66569", name: "Gregory", division: "Khulna", gender: "M", maritalStatus: "Single", age: 25, income: 83689 },
    { id: "BW63560", name: "Heather", division: "Barishal", gender: "F", maritalStatus: "Married", age: 35, income: 24599 },
    { id: "FV94802", name: "Helen", division: "Mymensingh", gender: "M", maritalStatus: "Married", age: 28, income: 25049 },
    { id: "OE15005", name: "Ian", division: "Sylhet", gender: "M", maritalStatus: "Married", age: 28, income: 28855 },
    { id: "WC83389", name: "James", division: "Rangpur", gender: "M", maritalStatus: "Married", age: 31, income: 51148 },
    { id: "FL50705", name: "Janet", division: "Chattogram", gender: "F", maritalStatus: "Married", age: 45, income: 66140 },
    { id: "ZK25313", name: "Janice", division: "Dhaka", gender: "M", maritalStatus: "Single", age: 39, income: 57749 },
    { id: "SV62436", name: "Jennifer", division: "Rajshahi", gender: "F", maritalStatus: "Divorced", age: 45, income: 13789 },
    { id: "YH23384", name: "John", division: "Mymensingh", gender: "M", maritalStatus: "Divorced", age: 35, income: 14072 },
    { id: "TZ98966", name: "Judith", division: "Sylhet", gender: "F", maritalStatus: "Single", age: 36, income: 0 },
    { id: "HM55802", name: "Julie", division: "Rangpur", gender: "F", maritalStatus: "Married", age: 46, income: 17870 },
    { id: "FS42516", name: "Karen", division: "Chattogram", gender: "M", maritalStatus: "Married", age: 40, income: 97541 },
    { id: "US89481", name: "Kevin", division: "Dhaka", gender: "F", maritalStatus: "Single", age: 33, income: 0 },
    { id: "HO30839", name: "Linda", division: "Rajshahi", gender: "F", maritalStatus: "Married", age: 47, income: 10511 },
    { id: "GE62437", name: "Lorraine", division: "Khulna", gender: "F", maritalStatus: "Single", age: 40, income: 86584 },
    { id: "EJ77678", name: "Lynette", division: "Rangpur", gender: "F", maritalStatus: "Married", age: 24, income: 75690 },
    { id: "SV85652", name: "Margaret", division: "Chattogram", gender: "M", maritalStatus: "Married", age: 36, income: 23158 },
    { id: "UL64533", name: "Mark", division: "Dhaka", gender: "M", maritalStatus: "Married", age: 35, income: 65999 },
    { id: "PF41800", name: "Mary", division: "Rajshahi", gender: "M", maritalStatus: "Married", age: 30, income: 0 },
    { id: "AO98601", name: "Michael", division: "Khulna", gender: "M", maritalStatus: "Married", age: 28, income: 54500 },
    { id: "SK67821", name: "Pamela", division: "Barishal", gender: "F", maritalStatus: "Married", age: 47, income: 37260 },
    { id: "YV55495", name: "Patricia", division: "Mymensingh", gender: "F", maritalStatus: "Married", age: 36, income: 68987 },
    { id: "KY38074", name: "Paul", division: "Sylhet", gender: "M", maritalStatus: "Married", age: 43, income: 42305 },
    { id: "DM79012", name: "Peter", division: "Rangpur", gender: "F", maritalStatus: "Married", age: 39, income: 65706 },
    { id: "CM61827", name: "Philip", division: "Chattogram", gender: "M", maritalStatus: "Single", age: 24, income: 0 },
    { id: "WC35801", name: "Richard", division: "Khulna", gender: "M", maritalStatus: "Divorced", age: 49, income: 53243 },
    { id: "QG25316", name: "Robert", division: "Rangpur", gender: "F", maritalStatus: "Married", age: 45, income: 0 },
    { id: "MB98372", name: "Robyn", division: "Chattogram", gender: "F", maritalStatus: "Single", age: 27, income: 50071 },
    { id: "IL19217", name: "Sandra", division: "Dhaka", gender: "F", maritalStatus: "Married", age: 34, income: 60021 },
    { id: "SR38658", name: "Stephen", division: "Rajshahi", gender: "M", maritalStatus: "Married", age: 25, income: 43244 },
    { id: "DH41343", name: "Steven", division: "Mymensingh", gender: "M", maritalStatus: "Married", age: 43, income: 92834 },
    { id: "HG65722", name: "Susan", division: "Sylhet", gender: "F", maritalStatus: "Married", age: 47, income: 10105 },
    { id: "BU27331", name: "Suzanne", division: "Rangpur", gender: "M", maritalStatus: "Single", age: 48, income: 0 },
    { id: "XM45289", name: "Wayne", division: "Chattogram", gender: "F", maritalStatus: "Single", age: 31, income: 23218 },
    { id: "KP34198", name: "Wendy", division: "Khulna", gender: "F", maritalStatus: "Married", age: 49, income: 0 },
    { id: "WE95729", name: "William", division: "Sylhet", gender: "F", maritalStatus: "Married", age: 35, income: 0 }
  ];
  
  // Get unique values for filters
  export const getUniqueValues = (key: keyof Customer) => {
    return [...new Set(customers.map(customer => customer[key]))].filter(Boolean);
  };
  
  // Get divisions with customer counts
  export const getDivisionData = () => {
    const divisionCounts: Record<string, number> = {};
    
    customers.forEach(customer => {
      divisionCounts[customer.division] = (divisionCounts[customer.division] || 0) + 1;
    });
    
    return Object.entries(divisionCounts).map(([name, value]) => ({ name, value }));
  };
  
  // Get gender distribution
  export const getGenderData = () => {
    const genderCounts: Record<string, number> = {};
    
    customers.forEach(customer => {
      genderCounts[customer.gender] = (genderCounts[customer.gender] || 0) + 1;
    });
    
    return Object.entries(genderCounts).map(([name, value]) => ({ name, value }));
  };
  
  // Get marital status distribution
  export const getMaritalStatusData = () => {
    const statusCounts: Record<string, number> = {};
    
    customers.forEach(customer => {
      statusCounts[customer.maritalStatus] = (statusCounts[customer.maritalStatus] || 0) + 1;
    });
    
    return Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
  };
  
  // Get age distribution
  export const getAgeDistribution = () => {
    const ageRanges = {
      "20-29": 0,
      "30-39": 0,
      "40-49": 0,
      "50+": 0
    };
    
    customers.forEach(customer => {
      if (customer.age < 30) ageRanges["20-29"]++;
      else if (customer.age < 40) ageRanges["30-39"]++;
      else if (customer.age < 50) ageRanges["40-49"]++;
      else ageRanges["50+"]++;
    });
    
    return Object.entries(ageRanges).map(([name, value]) => ({ name, value }));
  };
  
  // Get income distribution
  export const getIncomeDistribution = () => {
    const incomeRanges = {
      "No Income": 0,
      "1-25K": 0,
      "25K-50K": 0,
      "50K-75K": 0,
      "75K+": 0
    };
    
    customers.forEach(customer => {
      if (customer.income === 0) incomeRanges["No Income"]++;
      else if (customer.income < 25000) incomeRanges["1-25K"]++;
      else if (customer.income < 50000) incomeRanges["25K-50K"]++;
      else if (customer.income < 75000) incomeRanges["50K-75K"]++;
      else incomeRanges["75K+"]++;
    });
    
    return Object.entries(incomeRanges).map(([name, value]) => ({ name, value }));
  };
  
  // Get average income by division
  export const getAverageIncomeByDivision = () => {
    const divisionTotals: Record<string, { sum: number; count: number }> = {};
    
    customers.forEach(customer => {
      if (!divisionTotals[customer.division]) {
        divisionTotals[customer.division] = { sum: 0, count: 0 };
      }
      
      if (customer.income > 0) {
        divisionTotals[customer.division].sum += customer.income;
        divisionTotals[customer.division].count++;
      }
    });
    
    return Object.entries(divisionTotals).map(([name, { sum, count }]) => ({
      name,
      value: count > 0 ? Math.round(sum / count) : 0
    }));
  };
  
  // Filter customers based on criteria
  export const filterCustomers = (filters: Partial<Customer>) => {
    return customers.filter(customer => {
      for (const [key, value] of Object.entries(filters)) {
        if (value && customer[key as keyof Customer] !== value) {
          return false;
        }
      }
      return true;
    });
  };
  