export function calculateNewPrincipal(
    principal: number, 
    rateInPercent: number, 
    timeInYears: number) {

    let rate = rateInPercent / 100.0;
    return principal * (1.0 + rate * timeInYears);
}

export function calculateNewPrincipalForMonth(
    principal: number, 
    interest: number) {

    return calculateNewPrincipal(principal, interest, 1.0/12.0);
}

export function getMinimumMonthlyPayment(
    principal: number, 
    interest: number, 
    minimumPayment: number){

    const newPrincipal = calculateNewPrincipalForMonth(principal, interest);
    const minimumInterestPayment = newPrincipal - principal;
    const minimum = Math.max(minimumInterestPayment, minimumPayment);
    if(minimum < principal) {
        return minimum;
    } else {
        return principal;
    }
}