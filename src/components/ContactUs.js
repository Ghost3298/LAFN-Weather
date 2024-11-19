import React from 'react';
import { useTranslation } from 'react-i18next';

const ContactUS = () => {
    const { t } = useTranslation();

    return(
        <table className="ContactUsTable">
            <tbody>
                <tr>
                    <td>{t('Address')}:</td>
                    <td>
                        <a href="https://www.google.com/maps/place/Lebanese+Navy+Headquarters/@33.9003517,35.5015699,1446m/data=!3m1!1e3!4m10!1m2!2m1!1sbeirut+naval+base!3m6!1s0x151f16ef69fe029b:0x15f7eb6809c4366b!8m2!3d33.9003521!4d35.5069448!15sChFiZWlydXQgbmF2YWwgYmFzZZIBDW1pbGl0YXJ5X2Jhc2XgAQA!16s%2Fg%2F1tmmhqg4?entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">{t('AddressLoc')}</a>
                    </td>
                </tr>
                <tr>
                    <td>{t('Tel')}:</td>
                    <td>
                        <a href="tel:+9611983451">{t('TelNum')}</a>
                    </td>
                </tr>
                <tr>
                    <td>{t('Fax')}:</td>
                    <td>
                        {t('FaxNum')}
                    </td>
                </tr>
                <tr>
                    <td>{t('Email')}:</td>
                    <td><a href="mailto:Inhs.navy@army.gov.lb">Inhs.navy@army.gov.lb</a></td>
                </tr>
            </tbody>
        </table>
        )
};

export default ContactUS;