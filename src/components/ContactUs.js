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
                        {t('AddressLoc')}
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