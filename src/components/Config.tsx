/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TextField from '@mui/material/TextField';
import { FormEvent } from 'react';

import { PropsFromRedux, connector } from '../containers/Config';

type Props = PropsFromRedux & {
  onClientIdChange: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onDueWorkDaysChange: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onHolidaysChange: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onHolidaysRegexChange: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onPartialTimeOffRegexChange: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onTimeMinChange: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  clientId: string
  dueWorkDays: number
  holidays: number
  holidaysRegex: string
  partialTimeOffRegex: string
  timeMin: string
};

function Config(props: Props) {
  return (
    <div css={css`
      display: flex;
      flex-wrap: wrap;
      padding: 20px;
    `}>
      <TextField fullWidth={true} margin="normal" id="clientId" value={props.clientId} onChange={props.onClientIdChange} label="Identifiant client pour l'accès à l'API Google (client_id)" />
      <TextField fullWidth={true} margin="normal" id="timeMintimeMin" value={props.timeMin} onChange={props.onTimeMinChange} label="Date minimum" />
      <TextField fullWidth={true} margin="normal" id="dueWorkDays" value={props.dueWorkDays} onChange={props.onDueWorkDaysChange} label="Nombre de jours par an à travailler" />
      <TextField fullWidth={true} margin="normal" id="holidays" value={props.holidays} onChange={props.onHolidaysChange} label="INombre de jours de congé gagnés par an" />
      <TextField fullWidth={true} margin="normal" id="partialTimeOffRegex" value={props.partialTimeOffRegex} onChange={props.onPartialTimeOffRegexChange} label="Expression régulière pour reconnaitre les événements des jours off temps partiel (exemple : ^Absent|^RTT)" />
      <TextField fullWidth={true} margin="normal" id="holidaysRegex" value={props.holidaysRegex} onChange={props.onHolidaysRegexChange} label="Expression régulière pour reconnaitre les événements des congés payés (exemple : ^Congés)" />
    </div>
  );
}

export default connector(Config);
