import subprocess
import os

filepath = os.path.dirname(os.path.realpath(__file__))

subprocess.Popen(["sass", "--watch", filepath +
                 "/static/scss:", filepath + "/static/css"])

tsexec = ["tsc", "--watch", filepath +
                 "/static/ts/*", "--outDir", filepath + "/static/js"]
subprocess.Popen(tsexec)
