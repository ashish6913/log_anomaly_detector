from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC, wait
import random
import csv
import time

#use command 'export PATH=$PATH:/directory/to/driver' to add your webdriver to PATH

#create driver
driver = webdriver.Firefox(executable_path=r'/home/vmadmin/drivers/geckodriver') #can be changed to Chrome - requires chrome's webdriver

#waits for page to properly load, then returns the found element
#selenium processes commands faster than it can load a page
#so it is almost always necessary to use this function
def wait_for(driver, x_path):
    element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, x_path)))
    return element

#function pings all movies in the catalog
def ping_all_movies():
    url = 'http://localhost:4200/movies'
    for i in range(1,10):
        driver.get(url)
        btn_xpath = f'/html/body/app-root/div/app-movie-list/div/div/div[{i}]/mat-card/mat-card-actions/button'
        print('getting path: ', btn_xpath)
        element = wait_for(driver, btn_xpath)
        element.click()

#function pings the login service with two provided arguments
def ping_login(user, password):
    url = 'http://localhost:4200/auth/login'
    driver.get(url)
    driver.find_element_by_xpath('//*[@id="userId"]').send_keys(user)
    driver.find_element_by_xpath('//*[@id="password"]').send_keys(password)
    driver.find_element_by_xpath('/html/body/app-root/div/app-login/mat-card/form/div/button').click()

#changes all of user's ratings to the 'rating' argument
def ping_ratings(rating, user='1'):
    ping_login(user, '1')
    url = 'http://localhost:4200/ratings'
    for i in range (1,9):
        driver.get(url)
        btn_xpath = '/html/body/app-root/div/app-rating-list/div/mat-card[1]/div[2]/div[1]/div/button'
        print('fetching ellipses')
        elipses = wait_for(driver, '/html/body/app-root/div/app-rating-list/div/mat-card[1]/div[2]/div[1]/div/button')
        elipses.click()
        print('fetching edit button')
        edit_btn = wait_for(driver, '/html/body/div[2]/div[2]/div/div/div/a[1]')
        edit_btn.click()
        print('fetching input field')
        input_field = wait_for(driver, '//*[@id="mat-input-0"]')
        input_field.send_keys(Keys.CONTROL + 'a')
        input_field.send_keys(rating)
        print('fetching save button')
        save_btn = wait_for(driver, '/html/body/div[2]/div[2]/div/mat-dialog-container/app-rating-edit-dialog/div[2]/button[2]')
        save_btn.click()
        print('finished...')

#function sends 'comment' argument for movie with ID 'movieId'
def send_comment(comment, movieId):
    url = f'http://localhost:4200/movies/'
    driver.get(url)
    movie_button = wait_for(driver, f'/html/body/app-root/div/app-movie-list/div/div/div[{movieId}]/mat-card/mat-card-actions/button')
    movie_button.click()
    text_box = wait_for(driver, '//*[@id="mat-input-0"]')
    text_box.send_keys(comment)
    driver.find_element_by_xpath('/html/body/app-root/div/app-movie/div[2]/button').click()
    

#anomalous functions
def code_inject_on_edit():
    ping_login('1', '1')
    driver.get('http://localhost:4200/ratings')
    btn_xpath = '/html/body/app-root/div/app-rating-list/div/mat-card[1]/div[2]/div[1]/div/button'
    elipses = wait_for(driver, '/html/body/app-root/div/app-rating-list/div/mat-card[1]/div[2]/div[1]/div/button')
    elipses.click()
    edit_btn = wait_for(driver, '/html/body/div[2]/div[2]/div/div/div/a[1]')
    edit_btn.click()
    input_field = wait_for(driver, '//*[@id="mat-input-0"]')
    input_field.send_keys(Keys.CONTROL + 'a')
    input_field.send_keys('</><src>alert("here")</src>')
    save_btn = wait_for(driver, '/html/body/div[2]/div[2]/div/mat-dialog-container/app-rating-edit-dialog/div[2]/button[2]')
    save_btn.click()
    print('finished injection...')



# open the file in the read mode
# f = open('/home/vmadmin/Log/ml/data_comments/normal_comments.csv', 'r')
# f = open('/home/vmadmin/Log/ml/data_comments/sql_injection_comments.csv', 'r')
f = open('/home/vmadmin/Log/ml/data_comments/cross_site_script_comments.csv', 'r')

# create the csv reader
csv_reader = csv.reader(f)

num_of_comments = 100
i = 1
for row in csv_reader:
    comment = row[0]
    movie_id = random.randint(1,10)
    send_comment(str(comment), int(movie_id))
    time.sleep(1)
    
    i = i + 1
    if i > num_of_comments:
        break

f.close()



#send_comment('hello world', 1)
#code_inject_on_edit()
#ping_ratings(0)
#ping_ratings(1)
#ping_all_movies()
#ping_login('1', '1')