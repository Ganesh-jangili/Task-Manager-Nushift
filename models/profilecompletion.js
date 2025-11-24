const profileFields = [
    'name',
    'email',
    'password',
    'bio',
    'address',
    'pincode',
    'state',
    'country',
    'phone'
];

const isfilled=(data)=>{
    return data !== undefined && data !== null && data.toString().trim() !== '';

}

const clctProfileCompletion=(user)=>{
    let filledCount = 0;
    profileFields.forEach(field => {
        if (isfilled(user[field])) {
            filledCount++;
        }
    });
    const totalFields = profileFields.length;
    const completionPercentage = Math.round((filledCount / totalFields) * 100);
    return completionPercentage;

}

module.exports = {profileFields,clctProfileCompletion};