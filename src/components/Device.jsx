import React, { useState, useEffect } from "react";
import { BleClient, numberToUUID, dataViewToNumbers } from "@capacitor-community/bluetooth-le";
import { IonCard, IonCardContent, IonButton, IonIcon, IonList, IonItem, 
    IonInput } from '@ionic/react';
import { bluetoothSharp } from "ionicons/icons";

const HA_SERVICE = numberToUUID(0x181c);

export const Device = () => {
  const [isBtEnabled, setBtEnabled] = useState(false);
  const [message, setMessage] = useState('Idle');
  const [namePrefix, setNamePrefix] = useState('');

  const catchError = (e, message) => {
    setMessage(message);
    console.error(e);
  };

  const getBtStatus = async () => {
    try {
      const btEnabled = await BleClient.isEnabled();
      setBtEnabled(btEnabled);
      if (!btEnabled) await BleClient.initialize(); //{ androidNeverForLocation: true });
      if (!btEnabled)
        setMessage("Enable bluetooth & location in phone settings and click bluetooth icon to refresh");
    } catch (e) {
      catchError(e, "Bluetooth Unavailable");
    }
  };

  const scanBt = async () => {
    try {
      setMessage("Scanning...");
      if (!isBtEnabled) await BleClient.initialize();
      scanAdv();
    } catch (e) {
      catchError(e, "Scan Error");
    }
  };

  const scanAdv = async () => {
    try {
      setMessage("Reading advertisement...");
      
      if (!isBtEnabled) await BleClient.initialize();
      await BleClient.requestLEScan({
        namePrefix: namePrefix,
        allowDuplicates: true,
        scanMode: 1,
      }, (result) => {
        // note: JSON.stringify(result.rawAdvertisement) returns empty {}
        setMessage("Adv: " + JSON.stringify(result) + "RawAdv: " + JSON.stringify(dataViewToNumbers(result.rawAdvertisement?result.rawAdvertisement:{})));
      });
    } catch (e) {
      catchError(e, "Enable bluetooth & location in PC/phone settings and click bluetooth icon to refresh");
    }
  }

  useEffect(() => {
    scanAdv();
  }, [namePrefix]);

  useEffect(() => {
    if (isBtEnabled) scanBt();
  }, [isBtEnabled]);

  useEffect(() => {
    getBtStatus();
  }, []);

  return (
    <IonCard>
      <IonCardContent>
        <IonButton fill="outline" shape="round" onClick={() => scanBt()}>
          { isBtEnabled ? (
            <IonIcon size="large" slot="icon-only" color="green" icon={bluetoothSharp} />
          ) : (
            <IonIcon size="large" slot="icon-only" color="danger" icon={bluetoothSharp} />
          )}
        </IonButton>
      </IonCardContent>
      <IonCardContent>
        <IonList>
          <IonItem>
            <IonInput label="Device prefix:" placeholder="Enter prefix to filter devices" 
              onIonInput={ev => setNamePrefix(ev.target.value)}>
            </IonInput>
          </IonItem>
        </IonList>
      </IonCardContent>
      <IonCardContent>
        {'Info: ' + message}
      </IonCardContent>
    </IonCard>
  );
};
