import React from 'react';
import CurrentWeather from './CurrentWeather';
import News from './News';
import NewsList from './News.json';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();
    return(
    <div className="HomeView">
        <div className="HomeChild">
            <div className='News'>
                <h3>{t('News')}:</h3>
                {NewsList.news.map((article, index) => {
                        return (
                            <News key={index} newsItem={article} />
                        );
                    })}
            </div>
            <br/>
            <hr/>
            <br/>
            <div className='AboutUs'>
                <h3>{t('About Us')}:</h3>
                <p className='AboutUsText'>
                {t('1ParAboutUs')}<br/><br/>
                {t('2ParAboutUs')}<br/><br/>
                {t('3ParAboutUs')}<br/><br/>
                {t('4ParAboutUs')}<br/><br/>
                {t('5ParAboutUs')}<br/>
                <br/>
                <b>{t('DirOfLNHS')}</b><br/><br/>
                {t('DirOfLNHSName')}<br/><br/>
                {t('DirTalk')}
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