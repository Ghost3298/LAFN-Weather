import React from 'react';

const ContactUS = () => {
    return(
        <table className="ContactUsTable">
            <tbody>
                <tr>
                    <td>Address:</td>
                    <td>
                        Lebanese Hydrographic Service,
                        Beirut Naval Base,
                        Beirut, Lebanon
                    </td>
                </tr>
                <tr>
                    <td>Tel:</td>
                    <td>
                        <a href="tel:+9611983451">+961 1 983 451/2/3 <br/> ext 43091</a>
                    </td>
                </tr>
                <tr>
                    <td>Fax:</td>
                    <td>
                        +961 1 983 425
                    </td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td><a href="mailto:Inhs.navy@army.gov.lb">Inhs.navy@army.gov.lb</a></td>
                </tr>
            </tbody>
        </table>
        )
};

export default ContactUS;