# ServoMotor

[Docs](https://controllerstech.com/servo-motor-with-stm32/)

---

## Specifications:

**Angle:** 0 to 180 degrees

**Pinout:**
- `Black/Brown` **ground** wire
- `Red` **power** wire (around 5V)
- `Yellow` or White **PWM** wire

---

## Circuit Diagram

![Image](..\Images\Servo\circuit.png)

- `Yellow` or White PWM wire from motor connects to the pin `PA0` of the STM32.
- This is `TIM2 CH1`, which we have configured as the PWM out pin

---

## Theory

![Image](..\Images\Servo\4.png)

- Out of these parameters, the **Timer Clock will remain constant at 45MHz** throughout the project. 
- We want to generate the PWM signal with the **Frequency of 50Hz**
- To do so, I am setting the Prescaler and ARR values as shown below.

![Image](..\Images\Servo\6.png)

- **Pres** and **ARR** input values must be 1 less than the actual values. 
- This is because the library add a 1 to this value at the register level, so we must keep it 1 less than the value we want to pass.

#### Setting the Pulse Value:

- The servo motor responds for the pulse width of **0.5ms to 2.5ms**
- Also the pulse period is **20ms**, so in terms of Duty%, the pulse width for the extreme ends can be calculated as shown below.

![Image](..\Images\Servo\7.png)

- Now keeping the above duty cycles in mind, our choice of ARR affects the variations available for the pulse width.
**For Example-** Let’s assume we choose the **ARR** of `1000` and **Prescalar** value as `900-1`

![Image](..\Images\Servo\9.png)

 - To generate a duty cycle of 2.5%, we need to set the value 25 to the Compare Register (CCR)
 - Similarly to generate a duty cycle of 12.5%, we need to set the value 125 to the Compare Register (CCR)
 - This will give us only `100 steps` (125 – 25) of variations between the extreme positions 
 - Each step will result in a large variation in the Angular Displacement of the motor.

**Here in the project I chose the ARR value of 10000. The Compare Register value depends on the ARR, so the values for the Duty cycles are as follows:**

![Image](..\Images\Servo\10.png)

This set up will result in `1000 steps (1250 – 250) of variations between the extreme ends`
We will have more variations for the Angular Displacement

---

## Working
- Regular servos can go from 0° to 180° depending on the width of the pulse signal. 
- Basically you need to keep the pulse (+5v) high  for a particular amount of time. 
- Some of the important timings are mentioned below.
 - **0.5** milliseconds pulse width   corresponds to **0°**
 - **1.5** milliseconds pulse width corresponds to **90°**
 - **2.5** milliseconds pulse width corresponds to **180°**

![Image](..\Images\Servo\1.png)

**#Note:** The period of the PWM signal must be 20ms (frequency: 50 Hz)

---

## Code Working

`We will start the timer in PWM mode, using Timer 2 with Channel 1 to generate the PWM signal`

```c
HAL_TIM_PWM_Start(&htim2, TIM_CHANNEL_1);

while (1)
  {
	  htim2.Instance->CCR1 = 250;  // duty cycle is .5 ms
	  HAL_Delay(2000);
	  htim2.Instance->CCR1 = 750;  // duty cycle is 1.5 ms
	  HAL_Delay(2000);
	  htim2.Instance->CCR1 = 1250;  // duty cycle is 2.5 ms
	  HAL_Delay(2000);
  }
```

- In the while loop we will set the compare register to `250`. This will correspond to a rotation of `0°`
- Then after a delay of 2 seconds, set the compare register to `750`. This will correspond to a rotation of `90°`
- Again after a delay of 2 seconds, set the compare register to `1250`. This will correspond to a rotation of `180°`

**0°** = 250

**180°** = 1250

**PerDeg:** 
    = (1250-250)/180
    = 5.55

**For X Degrees:**
    = 250 + (X * PerDeg)

`Example:`
- X = 90°
- Pulse = 250 + (90 * 5.55)
        = 750


