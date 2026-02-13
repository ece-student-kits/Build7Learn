# Basics: SerialMonitor
`Task: Cofigure Serial Communication to print "Hello World!" with a delay of 1sec`
### Step 1: Create a STM32 Project "Serial"

---
 
### Step 2: Configure Serial Communication & GPIO pins:
- #### Under `Categories` in `Pinout & Configuration` Tab
     - Select Connectivity --> USART2

- #### Under USART2 Mode and Configuration Tab
     - Set the `Baud Rate` in `Parameter Settings`
        (`115200` by default)

- #### Configure GPIO pins `PA2` and `PA3` as TX and RX

![Image](..\Images\Serial\serial.png)

#### GPIO Pin Details:
- **PA2** as `USART_TX` (Port A, GPIO Pin 2)
- **PA3** as `USART_RX` (Port A, GPIO Pin 3)

(Already configured when initialized the pheripherals in default configuration)


---

### Step 3: Code Snippet for Serial 

- #### Place the following code under '/* USER CODE BEGIN PV */' inside the main loop:
```c
uint8_t tx_buffer[] = "Hello World!\n\r";
```

- #### Place the following code under 'while(1)' inside the main loop:
```c
HAL_UART_Transmit(&huart2, tx_buffer, sizeof(tx_buffer), 10);
HAL_Delay(1000);
```
---

### Step 4: Configuring the Serial Monitor
- #### Connect the Nucleo Board to PC
- #### Run the Code
- #### Console:
    - Click the `'Open Console'` button at the bottom 
        
        ![Image](..\Images\Serial\2.png)
        
    - Select `'Command Shell Console'` option
    - In the prompt which opens:
            ![Image](..\Images\Serial\3.png)
            
        - Select Connection type as `'SerialPort'`
        - Click `'New'` button under Connection name
        - Another prompt opens:
            - Select the respective `'BaudRate'` and `'SerialPort'`
            - Click Finish and Click Ok
