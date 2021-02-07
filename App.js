import 'react-native-gesture-handler';
import * as React from 'react';

import  {AuthProvider} from './src/containers/AuthContainer/AuthProvider';
import Router from './Router';

export default function App() {
  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  );
}


