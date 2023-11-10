const padTo2Digits = (num) => num.toString().padStart(2, '0');
export const formatDate = (date) => {
    
    return [date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate())
    ].join('-') + "T" + [padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds())
    ].join(':')+ ".000+00:00";

};