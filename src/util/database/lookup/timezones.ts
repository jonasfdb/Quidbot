type TimezoneOptionSelection = {
  label: string;
  withDst?: string;
  withoutDst: string;
};

export const timezoneMap = new Map<string, TimezoneOptionSelection>([
  ['-10', { label: '[-10] (SST/HST) - Samoa, Hawaii',            withDst: 'America/Adak',         withoutDst: 'Pacific/Honolulu' }],
  ['-9',  { label: '[-9] (AKT) - Alaska',                        withDst: 'America/Anchorage',    withoutDst: 'Pacific/Gambier' }],
  ['-8',  { label: '[-8] (PT) - Los Angeles, Vancouver',         withDst: 'America/Los_Angeles',  withoutDst: 'Pacific/Pitcairn' }],
  ['-7',  { label: '[-7] (MT) - Denver, Phoenix, Yukon',         withDst: 'America/Denver',       withoutDst: 'America/Phoenix' }],
  ['-6',  { label: '[-6] (CT) - Chicago, Mexico City',           withDst: 'America/Chicago',      withoutDst: 'America/Chihuahua' }],
  ['-5',  { label: '[-5] (ET) - New York, Toronto',              withDst: 'America/New_York',     withoutDst: 'America/Panama' }],
  ['-4',  { label: '[-4] (AT) - Halifax, Barbados',              withDst: 'America/Halifax',      withoutDst: 'America/Barbados' }],
  ['-3',  { label: '[-3] (BRT) - Sao Paulo, Buenos Aires',       withDst: 'America/Miquelon',     withoutDst: 'America/Sao_Paulo' }],
  ['0',   { label: '[+0] (UTC) - London, Lisbon',                withDst: 'Atlantic/Faroe',       withoutDst: 'Etc/UTC' }],
  ['1',   { label: '[+1] (CET) - Berlin, Paris, Rome',           withDst: 'Europe/Berlin',        withoutDst: 'Africa/Tunis' }],
  ['2',   { label: '[+2] (EET) - Athens, Helsinki',              withDst: 'Europe/Athens',        withoutDst: 'Etc/GMT-2' }],
  ['3',   { label: '[+3] (MSK) - Moscow, Istanbul',                                               withoutDst: 'Europe/Moscow' }],
  ['4',   { label: '[+4] (GST) - Dubai, Abu Dhabi',                                               withoutDst: 'Asia/Dubai' }],
  ['5',   { label: '[+5.5] (IST) - Kolkata, Delhi',                                               withoutDst: 'Asia/Kolkata' }],
  ['7',   { label: '[+7] (ICT) - Bangkok, Jakarta',                                               withoutDst: 'Asia/Bangkok' }],
  ['8',   { label: '[+8] (CST) - Hong Kong, Singapore, Perth',                                    withoutDst: 'Asia/Singapore' }],
  ['9',   { label: '[+9] (JST) - Tokyo, Seoul',                                                   withoutDst: 'Asia/Tokyo' }],
  ['10',  { label: '[+10] (AEST) - Guam, Sydney, Melbourne',     withDst: 'Australia/Sydney',     withoutDst: 'Australia/Brisbane' }],
  ['12',  { label: '[+12] (NZST) - Fiji, Auckland, Wellington',  withDst: 'Pacific/Auckland',     withoutDst: 'Pacific/Fiji' }],
]);