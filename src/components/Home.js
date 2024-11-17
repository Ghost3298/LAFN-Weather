import React from 'react';
import CurrentWeather from './CurrentWeather';
import News from './News';
import NewsList from './News.json';
const Home = () => {
    return(
    <div className="HomeView">
        <div className="HomeChild">
            <div className='News'>
                <h3>News:</h3>
                {NewsList.news.map((article, index) => {
                        return (
                            <News
                                key={index}
                                title={article.title}
                                imgSrc={article.imgSrc}
                                text={article.text}
                                details={article.details}
                            />
                        );
                    })}
            </div>
            <br/>
            <hr/>
            <br/>
            <div className='AboutUs'>
                <h3>About Us:</h3>
                <p className='AboutUsText'>
                The Lebanese Navy Hydrographic Service (LNHS) was established within the Lebanese Armed Forces<br/>
                Navy in 2014. LNHS is responsible for conducting hydrographic and oceanographic surveys in the
                Lebanese waters. Its primary mission is to collect, analyse and disseminate data related to the
                country’s marine environment, including the seabed, water depths, tides, currents and other
                important nautical information. This information is crucial for maritime safety, navigation,
                environmental monitoring and supporting defence operations.<br/><br/>
                The Lebanese Navy Hydrographic Service produces and maintain nautical charts and publications,
                ensuring safe passage for ships and boats within Lebanese waters. Additionally, it was involved in
                scientific research related to marine ecosystems and coastal management.<br/><br/>
                It was designated as the national point of contact for all hydrographic and safety of navigation
                related issues, and is responsible for issuing all navigational warnings in close relation with the
                NAVAREA III coordinator Spain.<br/><br/>
                It started following a capacity building project under the supervision of the Italian Hydrographic
                Institute in 2016, and played a crucial role in the delimitation of the maritime boundaries.<br/><br/>
                Given Lebanon’s strategic location along the Mediterranean coast, the Lebanese Navy Hydrographic
                Service plays a significant role in both national defence and the maritime economy, supporting
                shipping, fishing, and offshore energy activities.<br/>
                <br/>
                <b>Director of the Lebanese Navy Hydrographic Service</b><br/><br/>
                Captain (N) Afif Ghaith<br/><br/>
                "As Director of the Lebanese Navy Hydrographic Service, I can confidently say that hydrography and
                nautical charts are absolutely vital for Lebanon’s maritime safety and prosperity. It is essential that
                we provide accurate data to ensure the safe passage of vessels, whether they are transporting
                goods, supporting tourism, or contributing to national defence. Our nautical charts help ships
                navigate safely through our busy waters, preventing accidents and minimizing risks in vital shipping
                lanes and around key ports. For a country such as Lebanon, which relies heavily on maritime trade
                and a thriving tourism industry, reliable hydrographic services are indispensable for the smooth
                functioning of our economy. Additionally, through our surveys, we play a critical role in safeguarding
                our marine environment, ensuring sustainable practices as we monitor and protect Lebanon’s
                coastal and marine ecosystem."
                </p>
            </div>
        </div>
        <div className="HomeChild">
            <CurrentWeather />
        </div>
    </div>
    )
}

export default Home;