export const renderDate = (deadline) => {
    let newDeadline = deadline.replace(/ /ig, '/');
    let arr = newDeadline.split('/');
    let result = arr[2] + '-' +  arr[1] + '-' + arr[0] + 'T' + arr[3] + ':00.000';

    return result;
}