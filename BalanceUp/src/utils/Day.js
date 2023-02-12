import moment from 'moment';

const getMoment = (days, time) => {
  let m = moment().utcOffset(0);
  // console.log(tmpArray[i].routineDays[j]);
  let year = parseInt(days.split('-')[0], 10);
  let month = parseInt(days.split('-')[1], 10);
  month -= 1;
  let date = parseInt(days.split('-')[2], 10);
  let hour = parseInt(time.split(':')[0], 10);
  let minute = parseInt(time.split(':')[1], 10);

  m.set({
    year: year,
    month: month,
    date: date,
    hour: hour,
    minute: minute,
    second: 0,
    millisecond: 0,
  });
  m.toDate();
  var tmpM = new Date(m);
  return tmpM;
};

export default getMoment;
