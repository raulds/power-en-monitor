import random
import time
import pandas as pd
import numpy as np

import mysql.connector

# MySQL database connection parameters
host = '172.17.0.2'
user = 'root'
password = 'abacate'
database = 'power_monitor'

# function to create a sample unit
def generate_metering_sample():
    meterid = 1 
    # Simulate voltage in the range of 110V to 130V
    voltage = round(random.uniform(110, 130), 2)
    
    # Simulate current in the range of 5A to 20A
    current = round(random.uniform(5, 20), 2)

    # power factor 
    power_factor = round(random.uniform(0.7, 0.99), 2)

    # aparent power
    apparent_power = round(voltage * current, 2)

    # active power
    active_power = round(apparent_power * power_factor, 2)

    # reactive power
    reactive_power = round(np.sqrt(apparent_power**2 - active_power**2), 2)

    return {'meterId': meterid, 'voltage': voltage, 'current': current, 'power_factor': power_factor, 'apparent_power':apparent_power, 'active_power': active_power, 'reactive_power': reactive_power }

    
    
    # Calculate power in watts (P = V * I)
    #power = round(voltage * current, 2)
    
# Number of samples to generate
num_samples = 1000
energy_samples = []

# Generate and print the samples
for _ in range(num_samples):
    sample = generate_metering_sample()
    energy_samples.append(sample)
    print(f"Name: {sample['meterId']}, Voltage: {sample['voltage']}V, Current: {sample['current']}A, PF: {sample['power_factor']}W, Apparent Power:{sample['apparent_power']}VA, Active Power: {sample['active_power']}W, Reactive Power: {sample['active_power']}VAR")

data = pd.DataFrame(energy_samples)
print(data)

    #sample = generate_metering_sample()
    #print(f"Name: {sample['meter']}, Voltage: {sample['voltage']}V, Current: {sample['current']}A, Power: {sample['power']}W")
    # Optionally, you can insert these samples into a database or perform other operations.
    # Sleep for a short interval to simulate time passing
    #time.sleep(1)

try:
    # Connect to the MySQL server
    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )

    if connection.is_connected():
        cursor = connection.cursor()

        # SQL statement to insert energy sample data
        insert_query = "INSERT INTO samples (voltage, current, power_factor, apparent_power, active_power, reactive_power, meterId, createdAt, updatedAt) VALUES (%s, %s, %s, %s, %s, %s, %s,  NOW(), NOW())"

        # Insert each energy sample into the table
        for sample in energy_samples:
            data_tuple = (sample['voltage'], sample['current'], sample['power_factor'], sample['apparent_power'], sample['active_power'], sample['reactive_power'], sample['meterId'])
            cursor.execute(insert_query, data_tuple)
            connection.commit()

        print("Energy samples inserted successfully.")

except mysql.connector.Error as error:
    print("Error: {}".format(error))

finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed.")