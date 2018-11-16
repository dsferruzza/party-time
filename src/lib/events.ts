export interface DefaultReminder {
    method: string;
    minutes: number;
}

export interface Creator {
    email: string;
    self: boolean;
}

export interface Organizer {
    email: string;
    self: boolean;
    displayName: string;
}

export interface Start {
    dateTime: string;
    timeZone: string;
    date: string;
}

export interface End {
    dateTime: string;
    timeZone: string;
    date: string;
}

export interface Private {
    eventAttendeeList: string;
    everyoneDeclinedDismissed: string;
}

export interface ExtendedProperties {
    private: Private;
}

export interface Override {
    method: string;
    minutes: number;
}

export interface Reminders {
    useDefault: boolean;
    overrides: Override[];
}

export interface Attendee {
    email: string;
    responseStatus: string;
    self?: boolean;
    organizer?: boolean;
    displayName: string;
    resource?: boolean;
    comment: string;
}

export interface EntryPoint {
    entryPointType: string;
    uri: string;
    label: string;
    regionCode: string;
    pin: string;
}

export interface Key {
    type: string;
}

export interface ConferenceSolution {
    key: Key;
    name: string;
    iconUri: string;
}

export interface ConferenceData {
    entryPoints: EntryPoint[];
    conferenceSolution: ConferenceSolution;
    conferenceId: string;
    signature: string;
}

export interface OriginalStartTime {
    dateTime: string;
    timeZone: string;
}

export interface Event {
    kind: string;
    etag: string;
    id: string;
    status: string;
    htmlLink: string;
    created?: string;
    updated?: string;
    summary: string;
    creator: Creator;
    organizer: Organizer;
    start: Start;
    end: End;
    iCalUID: string;
    sequence?: number;
    extendedProperties: ExtendedProperties;
    reminders: Reminders;
    transparency: string;
    attendees: Attendee[];
    hangoutLink: string;
    conferenceData: ConferenceData;
    description: string;
    location: string;
    recurrence: string[];
    recurringEventId: string;
    originalStartTime: OriginalStartTime;
    guestsCanInviteOthers?: boolean;
    privateCopy?: boolean;
    visibility: string;
}

export interface Events {
    kind: string;
    etag: string;
    summary: string;
    updated: string;
    timeZone: string;
    accessRole: string;
    defaultReminders: DefaultReminder[];
    nextSyncToken: string;
    items: Event[];
}
