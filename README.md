# wolfram-tldr
Wolfram Alpha API spews a lot of schematic output.
This api is a simple proxy around the Wolfram API.<br/> 
It extracts the most relevant data from the result and
presents it in json or xml formats. 

**Setup**
----
  * First make sure you have node installed on your system:
  ```bash
    node -v
  ```
  * Next clone this repo:
  ```bash
    git clone https://github.com/sikender/wolfram-tldr.git
  ```
  * Now head over to [Wolfram Alpha API](https://developer.wolframalpha.com/portal/signup.html) site and sign up for an APPID.
  * Rename the .env.sample file to .env and add the APPID and the PORT you wish to run the server on to it.
  * Done. To run the app just execute:
  ```bash
    npm start
  ``` 

**Query**
----
  Return the result for your input query as either json or xml.

* **URL**

  /api/v1/query

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `input=string`

   **Optional:**
 
   `formal=json|xml`

    Defaults to json

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** Depending upon the format parameter<br />
    ```
      {
        "input": "When was nelson mendela born?",
        "interpretation": "Nelson Mandela | date of birth",
        "result": "Thursday, July 18, 1918"
      }
    ```

    or

    ```
      <?xml version='1.0'?>
      <result>
        <input>When was nelson mendela born?</input>
        <interpretation>Nelson Mandela | date of birth</interpretation>
        <result>Thursday, July 18, 1918</result>
      </result>
    ```

 
* **Error Response:**

  * **Code:** 401 Unauthorized <br />
    **Content:** `Unauthorized`

  OR

  * **Code:** 400 Bad Request <br />
    **Content:** `Bad Request`
  
  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `Internal Server Error`

* **Sample Call:**

  ```bash
    curl -X GET \
      'http://localhost:8000/api/v1/query?input=When%20was%20nelson%20mendela%20born?&format=xml' \
      -H 'Authorization: Bearer Your-bearer-token'
  ```