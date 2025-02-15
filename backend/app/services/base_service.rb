# frozen_string_literal: true

class BaseService
  include ::CustomErrors

  def initialize(*_args)
    @errors = []
  end

  def self.call(*args)
    service = new(*args)
    service.call
  end

  def errors
    @errors ||= []
  end

  def success?
    errors.empty?
  end

  def error?
    !success?
  end

  def first_error
    errors.first
  end

  def add_error(error)
    return if error.blank?

    case error
    when StandardError
      errors << error
    when BaseError
      errors << error
    when Array
      error.each { |e| add_error(e) }
    else
      errors << BaseError.new(error)
      logger.error(error)
    end
  end

  protected

  def log_error(err, args = {})
    info = { class_name: self.class.to_s }
    info.merge!(args) if args.present?
    if err.is_a? StandardError
      logger.error("Exception in #{self.class}: #{err.message}")
      logger.error("Request: #{info}")
    else
      logger.error("Exception in #{self.class}: #{err}")
    end
  end

  private

  def logger
    Rails.logger
  end
end
