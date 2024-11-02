import { useEffect, useState } from 'react';
import { ClaimIventDataType } from '../../../../../../../../api/exchanges-api/classes';
import { getTimeDiff } from '../../../../../../../../common/helpers';
import { InfoElement } from '../../../common/InfoElement';

type Props = {
  eventList: ClaimIventDataType[];
};

enum ClaimStatus {
  IDLE = 'idle',
  FINAL = 'final',
  WAITING = 'waiting',
}
const finalValues = ['finish', 'fail', 'refund', 'expire'];

export const TimeWaitingInfo = ({ eventList }: Props) => {
  const createdEventDateSeconds = new Date(eventList[0].created_at).getTime(); // date first event
  const [status, setStatus] = useState(ClaimStatus.IDLE);
  const [endDate, setEndDate] = useState(Date.now());

  useEffect(() => {
    setStatus(ClaimStatus.WAITING);
    eventList.forEach((el) => {
      if (finalValues.includes(el.title.toLowerCase())) {
        setEndDate(new Date(el.created_at).getTime());
        setStatus(ClaimStatus.FINAL);
      }
    });
    if (status === ClaimStatus.WAITING) {
      const id = setInterval(() => {
        setEndDate(new Date().getTime());
      }, 1000);
      return () => clearInterval(id);
    }
  }, [status, endDate, eventList]);

  const diferenceTimeInSeconds = endDate - createdEventDateSeconds;

  return (
    <>
      {status !== ClaimStatus.IDLE && (
        <InfoElement title={`Время ожидания(${status})`} value={`${getTimeDiff(diferenceTimeInSeconds)}`} />
      )}
    </>
  );
};
