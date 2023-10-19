import { Router } from 'express';
import { Address } from '../db/entities/customers/Address.js';
import { City } from '../db/entities/customers/City.js';
import { Country } from '../db/entities/customers/Country.js';

const addressRouter = Router();

// Create a new address
addressRouter.post('/', async (req, res) => {
  try {
    // Assuming the request body contains necessary address details
    const { cityId, street, postalCode } = req.body;

    const city = await City.findOne(cityId);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    const address = new Address();
    address.city = city;
    address.street = street;
    address.postalCode = postalCode;

    await address.save();

    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the address' });
  }
});

// Update an existing address
addressRouter.put('/:id', async (req, res) => {
  try {
    const addressId = req.params.id;
    const { cityId, street, postalCode } = req.body;

    const address = await Address.findOne(addressId);
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    const city = await City.findOne(cityId);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    address.city = city;
    address.street = street;
    address.postalCode = postalCode;

    await address.save();

    res.json(address);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the address' });
  }
});

// Delete an address
addressRouter.delete('/delete_address/:addressId', async (req, res) => {
  try {
    const addressId:string = req.params.addressId;

    const address = await Address.findOne(addressId); // Use the primary key directly
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    await address.remove();

    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the address' });
  }
});

// Get a list of addresses
addressRouter.get('/', async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve addresses' });
  }
});

export default addressRouter;
