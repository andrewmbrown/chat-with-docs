FROM python:3.6-slim-buster

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY requirements.txt ./

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# copy the rest of the files
COPY . .

# expose port 4000
EXPOSE 4000

CMD ["flask", "run", "--host=0.0.0.0", "--port=4000"]