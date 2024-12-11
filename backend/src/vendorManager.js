export class VendorManager {
  constructor(ticketPool, io) {
    this.ticketPool = ticketPool;
    this.io = io;
    this.vendors = []; // Array to store vendors
    this.isRunning = false;
    this.releaseRate = 0;
    this.vendorIntervals = {}; // Track intervals for each vendor
  }

  configure(releaseRate) {
    this.releaseRate = releaseRate;
  }

  // Add a vendor to the vendors list and start releasing tickets for that vendor
  addVendor(vendor) {
    this.vendors.push(vendor);
    console.log(`Vendor ${vendor.id} added successfully.`);
    this.startTicketReleaseForVendor(vendor);
    return this.vendors; // Return the updated list of vendors
  }

  // Start releasing tickets for a specific vendor
  startTicketReleaseForVendor(vendor) {
    if (!this.vendorIntervals[vendor.id]) {
      this.vendorIntervals[vendor.id] = setInterval(() => {
        if (!this.isRunning) return;

        const added = this.ticketPool.addTickets(this.releaseRate);
        if (added) {
          this.io.emit('ticketsAdded', {
            vendorId: vendor.id,
            count: this.releaseRate,
            available: this.ticketPool.getAvailableCount(),
          });
          
        }
        
      }, 1000); // Adjust interval as needed
    }
  }

  // Stop releasing tickets for a specific vendor
  stopTicketReleaseForVendor(vendorId) {
    if (this.vendorIntervals[vendorId]) {
      clearInterval(this.vendorIntervals[vendorId]);
      delete this.vendorIntervals[vendorId];
      console.log(`Ticket release stopped for vendor ${vendorId}.`);
    }
  }

  // Remove a specific vendor by ID
  removeVendor(vendorId) {
    const index = this.vendors.findIndex((vendor) => vendor.id === vendorId);
    if (index !== -1) {
      const removedVendor = this.vendors.splice(index, 1)[0];
      console.log(`Vendor ${vendorId} removed successfully.`);
      this.stopTicketReleaseForVendor(vendorId); // Stop ticket release for removed vendor
      this.io.emit('vendorRemoved', { vendorId });
      return this.vendors; // Return the updated list of vendors
    } else {
      console.log(`Vendor with ID ${vendorId} not found.`);
      return null;
    }
  }

  // Remove all vendors
  removeAllVendors() {
    const removedVendors = [...this.vendors]; // Copy current list for logging
    this.vendors = [];
    console.log(`All vendors removed successfully.`);
    this.io.emit('allVendorsRemoved', { count: removedVendors.length });
    return this.vendors; // Return the updated (empty) list of vendors
  }

  // Start the system, allowing ticket release to proceed
  start() {
    this.isRunning = true;
    this.vendors.forEach((vendor) => this.startTicketReleaseForVendor(vendor));
  }

  // Stop the system, halting all ticket releases
  stop() {
    this.isRunning = false;
    Object.values(this.vendorIntervals).forEach(clearInterval);
    this.vendorIntervals = {}; // Clear all vendor intervals
  }
}
