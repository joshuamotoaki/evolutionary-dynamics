import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Read the CSV file
df = pd.read_csv('./output.csv')

# Specify the k values we want
selected_k = [2, 6, 10]

# Create subplots (1 row, 3 columns)
fig, axs = plt.subplots(1, 3, figsize=(20, 6))

# Create a plot for each selected k value
for idx, k in enumerate(selected_k):
    # Filter data for this k value
    k_data = df[df['k'] == k]
    
    # Separate points with zero and non-zero fixation
    zero_mask = k_data['fixation'] == 0
    nonzero_mask = k_data['fixation'] > 0
    
    # Create scatter plot
    axs[idx].scatter(k_data[zero_mask]['lambda'],
                    k_data[zero_mask]['alpha'],
                    c='gray',
                    alpha=0.6,
                    label='Zero fixation',
                    s=50)
    
    axs[idx].scatter(k_data[nonzero_mask]['lambda'],
                    k_data[nonzero_mask]['alpha'],
                    c='blue',
                    alpha=0.6,
                    label='Non-zero fixation',
                    s=50)
    
    # Set scales to log
    axs[idx].set_xscale('log')
    axs[idx].set_yscale('log')
    
    # Set labels and title
    axs[idx].set_xlabel('λ', fontsize=12)
    axs[idx].set_ylabel('α', fontsize=12)
    axs[idx].set_title(f'k = {k}', fontsize=14)
    
    # Add grid
    axs[idx].grid(True, which="both", ls="-", alpha=0.2)
    
    # Add legend
    # axs[idx].legend()

# Adjust layout
plt.tight_layout()

# Save the figure
plt.savefig('figures/sleep-results.png', dpi=300, bbox_inches='tight')
plt.close()