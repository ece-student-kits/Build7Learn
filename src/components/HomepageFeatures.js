import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'CUBE IDE',
    Svg: require('../../static/img/CubeIDE.svg').default,
    description: (
      <>
        STM32CubeIDE is an all-in-one integrated development environment (IDE) designed for STM32 microcontrollers and ST microprocessors
      </>
    ),
  },
  {
    title: 'Nucleo Board',
    Svg: require('../../static/img/Nucleo.svg').default,
    description: (
      <>
        A Nucleo Board is a development board designed by STMicroelectronics for STM32 microcontrollers. It provides a cost-effective, flexible, and easy-to-use platform for prototyping and development with STM32 MCUs
      </>
    ),
  },
  {
    title: 'CUBE MX',
    Svg: require('../../static/img/CubeMX.svg').default,
    description: (
      <>
        STM32CubeMX is a graphical configuration tool used for STM32 microcontrollers. It helps developers set up microcontroller peripherals and generate initialization code automatically
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
