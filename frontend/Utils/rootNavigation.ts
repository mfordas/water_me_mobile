import * as React from 'react';

interface StackScreen {
  navigate: any;
}

export const navigationRef = React.createRef<StackScreen>();

export function navigate(name: string, params?: {}) {
  navigationRef.current?.navigate(name, params);
}
