import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/react';

import './Tab1.css';

const Tab1: React.FC = () => {
  const throwError = () => decodeURIComponent('%');
  const syntaxError = () => eval('foo bar');
  const rangeError = () => {
    var someArray = [{ func: function () {}}];
    someArray[1].func();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={throwError}>Decode</IonButton>
        <IonButton onClick={syntaxError}>Syntax</IonButton>
        <IonButton onClick={rangeError}>Range</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
