import json
import random
from datetime import datetime, timedelta

readers_ids = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
readers_names = ['ScentRecorder1', 'ScentRecorder2', 'ScentRecorder3', 'ScentRecorder4', 'ScentRecorder5', 'ScentRecorder6', 
                 'ScentRecorder7', 'ScentRecorder8', 'ScentRecorder9', 'ScentRecorder10', 'ScentRecorder11', 'ScentRecorder12',
                 'ScentRecorder13', 'ScentRecorder14', 'ScentRecorder15', 'ScentRecorder16', 'ScentRecorder17', 'ScentRecorder18',
                 'ScentRecorder19']
time_intervals = [5, 7, 11, 15, 23, 30, 45, 60]
levels = [1, 2, 3, 4]
level_names = ['green', 'yellow', 'orange', 'red']
levels_from_green = ['green', 'yellow', 'orange']
levels_from_yellow = ['green', 'orange', 'red']
levels_from_orange = ['green', 'red']
levels_from_red = ['green']
level_green_messages = ['All is good.',
                        'A corroded pipe has been replaced, and all is good.',
                        'A leaking valve has been replaced, and all is good.']
level_yellow_messages = ['Team has arrived and still tries to locate the leak.',
                    'A leak in a valve has been identified. Estimated time to fix: 5 minutes.',
                    'A leak has been found and fixed, Material residues are being collected.',
                    'Ongoing predictive maintenance on pipes. Finishing in 30 mins']
level_orange_messages = ['Team has arrrived, but fails to find the leak for some time now.',
                    'Damage identified to a valve, closing line to prevent worse leakage.',
                    'Small corroded pipe section is being replaced.']
level_red_messages = ['Major leak has been found in the tower, evacuate pessonel form G5.',
                    'Long corroded section of pipes has been identified, close line.',
                    'A small leaking anchor has been identified, but takes a long time to fix.']
starting_date = '2018-12-14 00:00:00'
ending_date = '2019-01-20 00:00:00'
global_state = [
    {
      "id": 0,
      "coordinates": {
        "lat": 32.78800244000398,
        "lng": 35.05891807758121
      },
      "location": "G5"
    },
    {
      "id": 1,
      "coordinates": {
        "lat":32.79929643743554, "lng": 35.0545709406465
      },
      "location": "G5"
    },
    {
      "id": 2,
      "coordinates": {
        "lat": 32.79817207921318, "lng": 35.06037943093315
      },
      "location": "G5"
    },
    {
      "id": 3,
      "coordinates": {
        "lat": 32.7934131259387, "lng": 35.069190619830124
      },
      "location": "G5"
    },
    {
      "id": 4,
      "coordinates": {
        "lat":32.79537630438263, "lng": 35.05928508965508
      },
      "location": "G5"
    },
    {
      "id": 5,
      "coordinates": {
        "lat": 32.789838607019284, "lng":35.05716078011528
      },
      "location": "G5"
    },
    {
      "id": 6,
      "coordinates": {
        "lat": 32.797216114483895, "lng": 35.06151668755547
      },
      "location": "G5"
    },
    {
      "id": 7,
      "coordinates": {
        "lat": 32.79483455650888, "lng": 35.056410117685346
      },
      "location": "G5"
    },
    {
      "id": 8,
      "coordinates": {
        "lat": 32.79586030509149, "lng": 35.063855573816454
      },
      "location": "G5"
    },
    {
      "id": 9,
      "coordinates": {
        "lat":  32.79402347855168, "lng": 35.06241790978447
      },
      "location": "G5"
    },
    {
      "id": 10,
      "coordinates": {
        "lat": 32.79446675401682, "lng": 35.06022037517823
      },
      "location": "G5"
    },
    {
      "id": 11,
      "coordinates": {
        "lat":32.79230936413287, "lng": 35.05961828488694
      },
      "location": "G5"
    },
    {
      "id": 12,
      "coordinates": {
        "lat": 32.791065227696734, "lng": 35.05902759758965
      },
      "location": "G5"
    },
    {
      "id": 13,
      "coordinates": {
        "lat": 32.798330086211436, "lng": 35.05561264298581
      },
      "location": "G5"
    },
    {
      "id": 14,
      "coordinates": {
        "lat": 32.79355449412625, "lng": 35.05218260018364
      },
      "location": "G5"
    },
    {
      "id": 15,
      "coordinates": {
        "lat": 32.79806385730691, "lng": 35.05265466897026
      },
      "location": "G5"
    },
    {
      "id": 16,
      "coordinates": {
        "lat": 32.795863316643505, "lng":35.05519740311638
      },
      "location": "G5"
    },
    {
      "id": 17,
      "coordinates": {
        "lat": 32.796855322000425, "lng": 35.054023872278776
      },
      "location": "G5"
    },
    {
      "id": 18,
      "coordinates": {
        "lat": 32.7973063002748, "lng": 35.05695693223015
      },
      "location": "G5"
    },
    {
      "id": 19,
      "coordinates": {
        "lat": 32.79628719551429, "lng": 35.058072731180346
      },
      "location": "G5"
    },
    {
      "id": 20,
      "coordinates": {
        "lat": 32.79628719551429, "lng": 35.058072731180346
      },
      "location": "G5"
    },
    {
      "id": 21,
      "coordinates": {
        "lat": 32.79628719551429, "lng": 35.058072731180346
      },
      "location": "G5"
    },
    {
      "id": 22,
      "coordinates": {
        "lat": 32.79628719551429, "lng": 35.058072731180346
      },
      "location": "G5"
    },
]
data = {
    "testData": [],
    "byEvent": [],
    "recorders_global_state": global_state
}


def empty_day_data(day):
    empty = {
        'date': day,
    }
    for reader in readers_names:
        empty[reader] = []

    return empty


def is_new_day(current, new):
    current_day = current.weekday()
    new_day = new.weekday()
    if (current_day == new_day):
        return False
    print('Switching day')
    return True


def get_reader_history(reader_name, current_date_data):
    # We need to extract the previous entry for the reader.
    # This is required to know what is the previous state, and elapsed time since being green
    elapsed_time = '00:00'
    prev_status = 'green'
    prev_state = None
    try:
        prev_state = current_date_data[reader_name][-1]
    except:
        try:
            prev_day = data['testData'][-1]
            prev_state = prev_day[reader_name][-1]
        except:
            pass

    if prev_state:
        elapsed_time = prev_state['elapsed_time']
        prev_status = prev_state['status']

    return prev_status, elapsed_time


def get_new_status(prev_status):
    if prev_status == 'green':
        status = random.choice(levels_from_green)
    if prev_status == 'yellow':
        status = random.choice(levels_from_yellow)
    if prev_status == 'orange':
        status = random.choice(levels_from_orange)
    if prev_status == 'red':
        status = random.choice(levels_from_red)

    if status == 'green':
        message = random.choice(level_green_messages)
    if status == 'yellow':
        message = random.choice(level_yellow_messages)
    if status == 'orange':
        message = random.choice(level_orange_messages)
    if status == 'red':
        message = random.choice(level_red_messages)

    return status, message


def get_new_elapsed(event_status, elapsed_time, min_to_event):
    if event_status == 'green':
        return elapsed_time

    td1 = timedelta(minutes = min_to_event)
    elapsed_hours = int(elapsed_time.split(':')[0])
    elapsed_mins = int(elapsed_time.split(':')[1])
    td2 = timedelta(hours=elapsed_hours, minutes=elapsed_mins)
    new_elapsed = td1 + td2
    seconds = new_elapsed.total_seconds()
    new_elapsed_hours = seconds // 3600
    new_elapsed_mins = (seconds % 3600) // 60
    return "%s:%s" % (int(new_elapsed_hours), int(new_elapsed_mins))

def get_avg_in_hours(day_events_elapsed_times):
    num_events = len(day_events_elapsed_times)
    td = timedelta(minutes=0)
    for elapsed_time in day_events_elapsed_times:
        elapsed_hours = int(elapsed_time.split(':')[0])
        elapsed_mins = int(elapsed_time.split(':')[1])
        td = td + timedelta(hours=elapsed_hours, minutes=elapsed_mins)

    avg_secs = td.total_seconds() / num_events
    return avg_secs / 3600.0


def generate_data():
    start_date = datetime.strptime(starting_date, '%Y-%m-%d %H:%M:%S')
    # end_date = datetime.utcnow()
    end_date = datetime.strptime(ending_date, '%Y-%m-%d %H:%M:%S')
    processing_date = start_date
    current_date_data = empty_day_data(processing_date.strftime('%Y-%m-%d'))
    yellow_event_counter = 0
    orange_event_counter = 0
    red_event_counter = 0
    day_events_elapsed_times = []
    while (end_date > processing_date):
        # Choose reader for the next event
        event_reader = random.choice(readers_ids)
        event_reader_name = readers_names[event_reader - 1]
        # Get the reader's history: status and elapsed time since it was green in %H:%M format
        prev_status, elapsed_time = get_reader_history(event_reader_name, current_date_data)

        # Choose the time of the next event
        min_to_event = random.choice(time_intervals)
        event_time = processing_date + timedelta(minutes = min_to_event)

        # New event time may switch day
        if (is_new_day(processing_date, event_time) == True):
            current_date_data['yellow_events'] = yellow_event_counter
            current_date_data['orange_events'] = orange_event_counter
            current_date_data['red_events'] = red_event_counter
            current_date_data['events_elapsed_times'] = day_events_elapsed_times
            current_date_data['events_elapsed_times_average'] = get_avg_in_hours(day_events_elapsed_times)
            yellow_event_counter = 0
            orange_event_counter = 0
            red_event_counter = 0
            day_events_elapsed_times = []
            data['testData'].append(current_date_data)
            current_date_data = empty_day_data(event_time.strftime('%Y-%m-%d'))

        # Advance time to event time
        processing_date = event_time

        # Build the new event
        event_status, event_message = get_new_status(prev_status)
        event_elapsed = get_new_elapsed(event_status, elapsed_time, min_to_event)
        # If this is back to green, this is an end of event, add time to stats
        if event_status == 'green':
            day_events_elapsed_times.append(event_elapsed)

        by_reader_event = {
            'time': processing_date.strftime('%H:%M'),
            'id': event_reader,
            'status': event_status,
            'message': event_message,
            'elapsed_time': "00:00" if event_status == 'green' else event_elapsed
        }
        if event_status == 'yellow':
            yellow_event_counter = yellow_event_counter + 1
        if event_status == 'orange':
            orange_event_counter = orange_event_counter + 1
        if event_status == 'red':
            red_event_counter = red_event_counter + 1
        current_date_data[event_reader_name].append(by_reader_event)
        event = {
            'id': event_reader,
            'date': processing_date.strftime('%Y-%m-%d %H:%M:%S'),
            'elapsed_time': event_elapsed,
            'status': event_status,
            'message': event_message
        }
        data['byEvent'].append(event)

    with open('/tmp/test_data_raw.json', 'w') as f:
        to_dump = {
            'testData' : data['testData'],
            'recorders_global_state': data['recorders_global_state']
        }
        f.write(json.dumps(to_dump))
    with open('/tmp/test_by_event_raw.json', 'w') as f:
        to_dump = {
            'byEvent': data['byEvent']
        }
        f.write(json.dumps(to_dump))


if __name__ == '__main__':
    generate_data()
