from pathlib import Path

import pandas as pd
import numpy as np
from api_key import *
import statsmodels.api as sm
import re
import itertools
import os
os.environ['X13PATH'] = 'x13as/'

import matplotlib.pyplot as plt
#from mpl_toolkits.basemap import Basemap
from mpl_toolkits.axes_grid1.inset_locator import inset_axes
from matplotlib.patches import Polygon
from matplotlib.patches import Rectangle
from matplotlib.colors import Normalize

plt.rc('font', family='Marion')

from statsmodels.tsa.x13 import x13_arima_analysis

cb_dir = Path('cb_dir/')
data_dir = Path('data_dir/')
text_dir = Path('text_dir/')
cps_dir = Path('cps_dir/')
acs_dir = Path('acs_dir/')