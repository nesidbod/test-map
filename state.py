history_global_state = {
    # At the top level we have an array.
    # Each day has an entry, and the entries are ordered by dates.
    [
        {
            # The date of that entry, each entry has a consecutive date
            "date": "Mon Dec 14",
            # Each Scent recorder has a key. We expect those same keys in every entry of the encapsulating array
            "Scent Recorder 1": {
                # An array of all events of that scent recorder.
                [
                    # each event is a dictionary of time and the status change
                    {"time": "00:05", "status": "green", "status": "some text here to be displayed when clicking on the icon"},
                    {"time", "00:35", "status": "orange", "status": "..."}
                ],
            },
            "Scent Recorder 2": {
                [
                    {"time": "00:05", "status": "green", "status": "..."},
                    {"time", "00:35", "status": "orange", "status": "..."}
                ]
            },
            # ...
            # All additional Scent recorders here 
            # ...
            "Mobile Scent Recorder": {
                [
                    # ...
                ]
            }
        }, {
            "date": "Tue Dec 15",
            "Scent Recorder 1": {
                [
                    {"time": "01:00", "status": "green", "status": "..."},
                    {"time", "02:45", "status": "orange", "status": "..."}
                ]
            }
        },
    ]
}

# This one I guess you already have in one form or another:
recorders_global_state = {
    "Scent Recorder 1": {
        "coordinates": "...",
        "location": "G5"
    },
    # ...
    "Mobile Scent Recorder": {
        "coordinates": "some close to center location on the map",
        "location": ""
    }
}
