#!/bin/sh
openssl req -x509 -newkey rsa:2048 -keyout ./chave_privada.pem -out ./chave_publica.pem -days 365

# Generating a RSA private key
# ...............+++++
# ..........................+++++
# writing new private key to './chave_privada.pem'
# Enter PEM pass phrase:
# Verifying - Enter PEM pass phrase:
# -----
# You are about to be asked to enter information that will be incorporated
# into your certificate request.
# What you are about to enter is what is called a Distinguished Name or a DN.
# There are quite a few fields but you can leave some blank
# For some fields there will be a default value,
# If you enter '.', the field will be left blank.
# -----
# Country Name (2 letter code) [AU]:BR
# State or Province Name (full name) [Some-State]:RN
# Locality Name (eg, city) []:Natal
# Organization Name (eg, company) [Internet Widgits Pty Ltd]:Acme Inc
# Organizational Unit Name (eg, section) []:Acme
# Common Name (e.g. server FQDN or YOUR name) []:localhost
# Email Address []:email@email.com
