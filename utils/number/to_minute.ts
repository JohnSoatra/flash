const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * ONE_MINUTE;

function toMinutes(seconds: number): string {
    seconds = Math.floor(seconds);
    let result = '';
    let hours = Math.floor(seconds / ONE_HOUR);
    let minutes: string|number =  Math.floor(seconds / ONE_MINUTE) - (hours * ONE_MINUTE);
    let _seconds: string|number = seconds - (hours * ONE_HOUR + minutes * ONE_MINUTE);

    if (hours > 0) {
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        result = `${hours}:`;
    }

    if (_seconds < 10) {
        _seconds = '0' + _seconds
    }


    return (result + `${minutes}:${_seconds}`);
}

export default toMinutes;