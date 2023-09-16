from datetime import timedelta


def seconds_to_timestamp(seconds):
    # Convert the number of seconds to a timedelta
    delta = timedelta(seconds=seconds)
    
    # Format the timedelta as HH:MM:SS
    hours, remainder = divmod(seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    
    return "{:02}:{:02}:{:02}".format(int(hours), int(minutes), int(seconds))