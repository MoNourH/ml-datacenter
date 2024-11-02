#!/bin/bash

# Create a virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python -m venv venv
    echo "Virtual environment 'venv' created."
fi

# Activate the virtual environment
source venv/bin/activate

# Install requirements if requirements.txt is updated
if [ -f requirements.txt ]; then
    pip install -r requirements.txt
    echo "Requirements installed."
fi

# Run the Flask app
python -m flask --app app run  # Adjust to your app's entry point
