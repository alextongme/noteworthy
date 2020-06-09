import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

export const time = (timestamp) => {
    let timeObj = new Date(timestamp);
    // debugger
    let lapsed = Date.now() - timeObj.getTime();
    // debugger
    // debugger
    return (timeAgo.format(timeObj));
}