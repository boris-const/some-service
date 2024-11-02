import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';
import fileDownload from 'js-file-download';

import { ClaimStatus } from '../../api/exchanges-api/classes';
import { TFileExtentions } from '../types';

export const getColor = (status: ClaimStatus) => {
  // colors
  const gray = 'gray';
  const yellow = '#EAD61B';
  const red = 'red';
  const green = 'green';
  switch (status) {
    case ClaimStatus.CONFIRM:
      return [yellow, gray, gray, gray];
    case ClaimStatus.EXCHANGE:
      return [green, green, yellow, gray];
    case ClaimStatus.SEND:
      return [green, green, green, yellow];
    case ClaimStatus.FINISH:
      return [green, green, green, green];
    case ClaimStatus.FAIL:
      return [green, red, red, red];
    case ClaimStatus.REFUND:
      return [green, red, red, red];
    case ClaimStatus.HOLD:
      return [green, red, gray, gray];
    case ClaimStatus.EXPIRE:
      return [red, gray, gray, gray];
    case ClaimStatus.WAIT_DEPOSIT:
    default:
      return [gray, gray, gray, gray];
  }
};

/// ----
export function getTimeDiff(diference: number) {
  const hoursFromDate = new Date(diference).toISOString().substring(11, 13); // take string "HH"
  const timeDate = new Date(diference).toISOString().substring(13, 19); // take string ":MM:SS"
  let hours = Number(hoursFromDate); // count of hours

  const [year, month, day] = new Date(diference).toISOString().substring(0, 10).split('-'); // 1970 01 01 + difference

  let resultTimeDifference = '';

  if (day !== '01') {
    const plusHours = (Number(day) - 1) * 24;
    hours += plusHours;
  }

  if (year !== '1970') {
    resultTimeDifference = '>Year';
    console.log(`Разница от 1970-01-01Т00:00:00 -> ${new Date(diference).toISOString()}`);
    return resultTimeDifference;
  }

  if (month !== '01') {
    resultTimeDifference = '>Mounth';
    console.log(`Разница от 1970-01-01Т00:00:00 -> ${new Date(diference).toISOString()}`);
    return resultTimeDifference;
  }

  resultTimeDifference = `${hours}${timeDate}`;
  return resultTimeDifference;
}
// -----

export const getDate = (stringDate: string) => {
  let date = new Date(stringDate);
  return date;
};

export const copyFunction = (textToCopy: string): void => {
  if (textToCopy === '') {
    toast.error('Try to copy empty string');
  }
  // Adding text value to clipboard using copy function
  let isCopy = copy(textToCopy);
  //Dispalying notification

  if (isCopy) {
    toast.success('Copied to Clipboard');
  } else {
    toast.error('Something go wrong when coping');
  }
};

export const downloadFunction = (
  filenameWithoutExtention: string,
  extention: TFileExtentions,
  downloadStringValue: string
) => {
  fileDownload(downloadStringValue, filenameWithoutExtention + '.' + extention);
};

