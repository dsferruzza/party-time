import { OrderedMap } from 'immutable';
import { DateTime, Duration, Settings } from 'luxon';

Settings.defaultLocale = 'fr';

export function nonWorkingDays(year: number): OrderedMap<string, DateTime> {
  const paques = computePaques(year);
  // tslint:disable:object-literal-sort-keys
  return OrderedMap({
    "Jour de l'an": DateTime.fromObject({ year, month: 1, day: 1 }),
    "Lundi de Pâques": paques.plus(Duration.fromObject({ days: 1 })),
    "Fête du travail": DateTime.fromObject({ year, month: 5, day: 1 }),
    "Victoire des alliés": DateTime.fromObject({ year, month: 5, day: 8 }),
    "Jeudi de l'Ascension": paques.plus(Duration.fromObject({ days: 39 })),
    "Lundi de Pentecôte": paques.plus(Duration.fromObject({ days: 50 })),
    "Fête nationale": DateTime.fromObject({ year, month: 7, day: 14 }),
    "Assomption": DateTime.fromObject({ year, month: 8, day: 15 }),
    "La Toussaint": DateTime.fromObject({ year, month: 11, day: 1 }),
    "Armistice": DateTime.fromObject({ year, month: 11, day: 11 }),
    "Noël": DateTime.fromObject({ year, month: 12, day: 25 }),
  })
  // tslint:enable:object-literal-sort-keys
}

// https://fr.wikipedia.org/wiki/Calcul_de_la_date_de_P%C3%A2ques
function computePaques(year: number): DateTime {
  const n = year % 19;
  const c = Math.floor(year / 100);
  const u = year % 100;
  const s = Math.floor(c / 4);
  const t = c % 4;
  const p = Math.floor((c + 8) / 25);
  const q = Math.floor((c - p + 1) / 3);
  const e = (19 * n + c - s - q + 15) % 30;
  const b = Math.floor(u / 4);
  const d = u % 4;
  const L = (2 * t + 2 * b - e - d + 32) % 7;
  const h = Math.floor((n + 11 * e + 22 * L) / 451);
  const m = Math.floor((e + L - 7 * h + 114) / 31);
  const j = (e + L - 7 * h + 114) % 31;
  return DateTime.fromObject({ year, month: m, day: j + 1 });
}
